import {app} from "./app";

const port = process.env.PORT || 3005

app.listen(port, () => {
    console.log('hey epta')
})
