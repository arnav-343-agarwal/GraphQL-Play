const express = require('express')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const bodyParser = require('body-parser')
const cors = require('cors')
const {
  ApolloServerPluginLandingPageLocalDefault
} = require('@apollo/server/plugin/landingPage/default');

async function startServer() {
    const app = express()
    const server = new ApolloServer({
        typeDefs:`
            type Todo {
                id: ID!
                title: String!
                completed: Boolean
            }

            type Query {
                getTodos : [Todo]
            }
        `,
        resolvers:{},
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
    })

    app.use(cors())
    app.use(express.json());

    await server.start()
    app.get('/graphql', (req, res) => {
        res.redirect('https://studio.apollographql.com/sandbox/explorer');
    });
    app.use('/graphql', express.json() ,expressMiddleware(server))

    app.listen(8000,()=>{
        console.log("Server started at port 8000")
    })
}

startServer()