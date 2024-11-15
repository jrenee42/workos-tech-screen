This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Install all needed packages:

```bash
npm install --force
```
some of the dependencies are not aligned.
given more time, I would align all the packages properly.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Notes on if I had more time

I would:
* show better error messages
*  add toast/snackbar notifications each time each dialog was used
*  add pagination
*  add i18n for all the string literals
*  extract out a Table class or Hook to prevent the code copying I did
   * for UserTable/RoleTable; especially the state vars  (isLoading, error)
   * and to reuse the table styling
* extract out one class for the dropdown menu to prevent similar code
* add ability to edit the role description and whic is the default role
   * I would do that by allowing the user to set one of the non-default roles to be the default;
   * because there should always be one default role.
   * if the backend doesn't set the new one as the default and the previous default as *not* the default, then I would handle it on the frontend
* sometimes the roles don't load on the users tab; would add better logic to prevent that and fail more gracefully as well
* would clean up DropdownMenu; to use the themes object and clean up unused css
* There are a few lingering errors; I would fix all of those