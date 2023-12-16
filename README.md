# SemesterProject2
<img width="995" alt="Screenshot 2023-12-16 at 20 25 30" src="https://github.com/KarenJoo/SemesterProject2/assets/114563762/2e9a8e24-1503-4e06-aa48-4959c5ea027d">



## Description

BestBid auction app envisions a world where everyone can access quality,  sustainable interiors and items at affordable prices. 
BestBid aim to create a community that values both the environment and budget-friendly living while the user discovers their dream listing! 

With their slogan "Your dream is one bid away" BestBid encourages you to take action and create your budget-friendly living", ensuring that everyone can take a chance and place a bid to get their dream environment.

All API functionality is managed by an existing application. This project only covers the front-end application for the API.

## Goal:
"An auction site is looking to launch a website where users can add items to be bid on and bid on items other users have put up for auction.

When a new user joins the website, they are given 1000 credits to use on the site. They can get credits by selling items and use credit by buying items. Non-registered users can search through the listings, but only registered users can make bids on listings." - SP2 Brief, Noroff.

### Register user
- A create HTML form with the correct fields to register a user
- A user with a stud.noroff.no email may register
- Validate form criterias
- Send details to the API

### Log in
- Create an HTML form with the correct fields
- Validate form criterias
- Set an event listener for submission
- Send details to the API
- Store token from response

### Logout
- A registered user can logout
- Clear token from storage
  
### Authorization check
- An unauthorized user can not bid on listings
- An unauthorized user can not display the profile icon
- An unauthorized user can display the feed but not the specific listing page
- An unauthorized user can search and filter search
  
### Profile 
- A registered user can update their avatar
- A registered user can view their total credit
- A registered user can display their created listings

### Listings
- A registered user can create a listing and display it on the feed (POST)
- A registered user can create a Listing with a title, deadline date, media gallery and description
- A registered can click on a specific listing and display the listings media gallery, bidders list,
  the current highest bid on listing, time left of bidding, and number of bidders
- A registered user can place a bid, but only if the amount is higher than the current highest bid
- A registered user can place a bid and display a bidder list 
- A registered user can update a created listing (PUT)
- A registered user can delete a created listing (DELETE)
- A registered user can display another sellers profile and their created listings

## Pages
- Index 
- Register 
- Login 
- Profile 
- Specific listing 
- Create a listing
- Edit profile
- About 

  
## Built With
- HTML
- SASS
- Bootstrap
- JS

### Executing program
- Netlify: https://best-bid.netlify.app/
- Style board: https://my.corebook.io/TLvvI6pQKm9xWSI78McpG48zxmbk9IWW
- Trello board: https://trello.com/b/yMsCkGk1/sp2-bid 

## License
- MIT License


## Project Configuration
The project incorporates the following configurations:

- Prettier is installed and configured to run on commit > to ensure consistent code formatting
- ESLint is installed and configured to run on commit > to catch potential issues early
- Cypress is installed and configured for end-to-end testing
- Husky is installed and configured to run pre-commit hooks
- Bootstrap v.5.3.2


### Run commands
npm install
npm run build


### Prerequisites

- [Node.js](https://nodejs.org/) installed

## Installation

### Clone the repository
git clone [https://github.com/KarenJoo/social-media-client.git](https://github.com/KarenJoo/SemesterProject2.git)

### Navigate to the project directory
cd SemesterProject2

### Install dependencies
npm install


## Authors and Contact
**Karen Jo**

📫 KarFik31658@stud.noroff.no
