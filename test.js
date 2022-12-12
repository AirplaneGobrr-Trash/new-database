const dbClass = require("./database")


async function way1(){
    const db = new dbClass("http://localhost:3500/", "way1", "password")

    // Init the table of the database
    await db.set("servers", {})
    // Now we can use it
    await db.set("servers.723776438712664094", {
        users: [793281470696652821n, 904360748455698502n, 250029754076495874n]
    })
    // Set the default table to use (can be very usefull!)
    db.defaultTable = "servers"
    console.log("Way1",await db.get())
    db.defaultTable = "servers.723776438712664094"
    console.log("Way1",await db.get())
}

async function way2(){
    const db = new dbClass("http://localhost:3500/", "way2.servers", "password")
    await db.set("723776438712664094", { users: [793281470696652821n, 904360748455698502n, 250029754076495874n] })
    db.defaultTable = 723776438712664094n
    console.log("Way2",await db.get())

}
way1()
way2()