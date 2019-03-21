import app from './app'

const port = 8081

app.listen(port, ()=> {
    console.log('Server is running on port %d', port)
})