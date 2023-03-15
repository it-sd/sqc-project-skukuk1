# The Butterfly Interest List
Welcome to my final project for the class Software Quality Control.

My name is Samantha Kukuk and my CVTC username is skukuk1.

Here is the link to this project on [Render](https://the-butterfly-interest-list.onrender.com).

## Description
Do you have a large collection of things to keep track of? Have you ever wanted to combine multiple lists in one place? If you answered yes to either of these questions, The Butterfly Interest List is for you.

Here at The Butterfly Interest List, you will be able to create a list from your own input that can be stored and cached locally. Another feature we plan to add is pulling data from other sites and databases. So if you aren't quite sure if you want to add your own items, don't worry.

We can't wait for you to use our site. Enjoy your visit!

## Render Link
[The Butterfly Interest List](https://the-butterfly-interest-list.onrender.com)

## Database Entity Relationship Diagram
![Entity Relationship Diagram](/docs/EntityRelationshipDiagram.png)

## Datbase Connection
I've decided to create a new database with the name of "the_butterfly_interest_list". If you decide to keep this database, you will need to make a `.env` file. All you need to have in the file is `DATABASE_URL=postgres://postgres:postgres@localhost/the_butterfly_interest_list`. Note: I've only tested this as a Windows user.

If you want to use the default database, then you'll want to comment out these lines in the `schema.sql` file.

    DROP DATABASE the_butterfly_interest_list;
    CREATE DATABASE the_butterfly_interest_list;

    \c the_butterfly_interest_list

## Contributors
lmarquardt7 - Account Creation

swang6 - Update README.md

4. Hello from swang6!
