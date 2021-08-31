# Dennis Chen's Website

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

It is expected that you make your own database.
You should make a file called `.env.local`
and put all your environment variables there.

## Structure

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
- pages: Doh.
- server: Backend stuff.