# MAST Website

Thie is the GitHub repository for the MAST website.
All the code that runs the website is here.
Currently, there's no backend,
but we anticipate having backend very soon.

Our stack is

    React JS + Next JS + Tailwind CSS

I cannot make this clear enough:
**these elements are completely orthogonal**.
There are tools that make them play better together,
but these tools do not serve the same purpose.

In particular, React is the framework,
Next is used for rendering
(it takes a hybrid server-side and client-side rendering approach),
and Tailwind is used for styling the frontend.

This project is using `yarn` as its package manager.

## Running

Clone the repository and run `yarn dev`.

### Server setup

For testing, it is expected that you make your own database.
You should make a file called `.env.local`
and put all your environment variables there.

If you create a local Mongo database for testing, which I recommend,
you will want .env.local to look like this:

    MONGODB_URI=mongodb://dbOwner:2729@localhost:27017/?authSource=mast&readPreference=primary
    MONGODB_DB=mast

(You can change the value of `MONGODB_DB` if you really wish to do so, but there is not really a good reason to do so. If you do, replace `mast` in the instructions with whatever your database name is.)

After installing `mongodb` locally and starting the mongodb services, run `mongosh` and type the following commands:

    use mast
    db.createCollection("users")
    db.users.createIndex( { "creationDate": 1 }, { expireAfterSeconds: 60*60*24*7*2 } )
    db.users.createIndex({ "username": 1 }, {unique: true})
    db.createCollection("email_proxy")
    db.email_proxy.createIndex( { "creationDate": 1 }, { expireAfterSeconds: 60*60*24*7*2 } )
    db.email_proxy.createIndex({ "email": 1 }, { unique: true })

In production we create a `dbOwner` and require authentication for most operations. But this should not be necessary in local testing.

## Structure

The top-level directory names are quite self-explanatory.
Build tasks are automated via `cargo-make`.

### Client

Very roughly, this follows
[Tania Rascia's](https://www.taniarascia.com/react-architecture-directory-structure/#utils) guide,
plus a separate directory for the server.

- public: Any files I want the public to be able to view
  (hence the name).
- resources: PDFs that would be filed under math.
- reports: PDFs that would be filed under writing.
- styles: Self-explanatory.
- components: Anything that is mostly visual.
  Lines can get a little blurry between components and utils.
- utils: Anything more complicated than a slew of `<div className="...">`
  - server: Handles logic on the clientside before it is sent to the server.
- pages: Doh.
  - api: Doh. (This is what actually sends stuff to the server.)

### Server

We use the `actix-web` framework written in Rust.
