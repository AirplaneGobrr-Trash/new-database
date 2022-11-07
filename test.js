const dbClass = require("./database")


async function way1(){
    const db = new dbClass("http://localhost:3500/", "test_db", "password")

    // Init the table of the database
    await db.set("servers", {})
    // Now we can use it
    await db.set("servers.723776438712664094", {
        users: [793281470696652821, 904360748455698502, 250029754076495874]
    })
    // Set the default table to use (can be very usefull!)
    db.defaultTable = "servers"
    console.log(await db.get())
    db.defaultTable = "servers.723776438712664094"
    console.log(await db.get())
}

async function way2(){
    const db = new dbClass("http://localhost:3500/", "test_db.servers", "password")
    await db.set("723776438712664094", { users: [793281470696652821, 904360748455698502, 250029754076495874] })
    db.defaultTable = "723776438712664094" // Make sure to always use strings!
    console.log(await db.get())

    console.log("error")
    // Error example: 
    try {// Make sure to always use strings! Javascript will convert this (723776438712664094) to 723776438712664000 (replaces 94 to 00)
        db.defaultTable = 723776438712664094 
        console.log(await db.get()) // ERROR! No database!
    } catch (e) {
        console.log(e)
    }
}
way2()