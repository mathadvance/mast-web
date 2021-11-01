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

If you create a local Mongo and Redis database for testing, which I recommend,
you will want .env.local to look like this:

    DOMAIN=https://mast.mathadvance.org

    MONGODB_URI=mongodb://dbOwner:<password>@localhost:27017/?authSource=mast&readPreference=primary
    MONGODB_DB=mast

    REDIS_SESSION_URI=redis://localhost:6379/0
    REDIS_EMAILVERIFY_URI=redis://localhost:6379/1
    REDIS_RESETPASSWORD_URI=redis://localhost:6379/2
    REDIS_CHANGEEMAIL_URI=redis://localhost:6379/3

    NOREPLY_NAME=
    NOREPLY_EMAIL=
    NOREPLY_PASSWD=

(Replace `<password>` with the password of the dbOwner user `dbOwner`.)

You can change the value of `MONGODB_DB` if you really wish to do so, but there is not really a good reason to do so. If you do, replace `mast` in the instructions with whatever your database name is.

Mongo is a bit tricky to setup. I won't cover installation, that depends on your distribution of Linux and is pretty easy anyway. To enter the mongo shell, run `mongosh`. Then, in the mongo shell, run

    use mast
    db.createUser({user: "dbOwner", pwd: "<password>", roles: ["dbOwner"]})

where `<password>` indicates the password passed into `MONGODB_URI`.
Then exit the mongo shell and run `node mongo-scripts/mongo-setup.js` _inside_ the root directory of this repository.

In production, you want to enable authentication in Mongo. But this is easily Googleable, so I won't cover it here.

For `redis` just start up the service. Make a password and add authentication information to `REDIS_URI` in production.

## Structure

Very roughly, this follows
[Tania Rascia's](https://www.taniarascia.com/react-architecture-directory-structure/#utils) guide,
plus a separate directory for the server.

- public: Any files I want the public to be able to view (hence the name).
- styles: Self-explanatory.
- components: Anything that is mostly visual.
- utils: Clientside types, logic, etc.
  - server: Handles logic on the clientside before it is sent to the server. (Think of this as middleware tools.)
  - email_templates: Duh.
- pages: Duh.
  - api: Duh. (This is what actually sends and retrieves stuff from the server.)
