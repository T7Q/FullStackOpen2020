const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Book = require('./models/book')
const Author = require('./models/author')

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(title: String!, published: Int!, author: String!, genres: [String!]!): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate('author')
      if (args.author && args.genre) {
        return books.filter(
          (book) => book.author.name === args.author && book.genres.includes(args.genre)
        )
      } else {
        if (args.author) {
          return books.filter((book) => book.author.name === args.author)
        }
        if (args.genre) {
          return books.filter((book) => book.genres.includes(args.genre))
        }
      }
      return books
    },
    allAuthors: () => Author.find({}),
  },
  Author: {
    bookCount: async (root) => await Book.find({ author: root.id }).countDocuments(),
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      try {
        if (!author) {
          author = new Author({ name: args.author, id: uuid() })
          author.save()
        }
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }

      let book = new Book({ ...args, author: author.id, id: uuid() })
      try {
        await book.save()
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }

      book.author = author
      return book
    },
    editAuthor: async (root, args) => {
      let authorToEdit = await Author.findOne({ name: args.name })
      try {
        authorToEdit = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          { new: true }
        )
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        })
      }

      return authorToEdit
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
