

## TODO
### UI and Functionality
- General
    - Come up with site-wide design
    - Make notification popups not get in the way
- Home
    - Needs more content. Explain what the app is, show some demo gifs, about the creator (me!)
- Signup
    - Send activation email
      - "Click here to confirm your email"
      - Brings you to login page
- Login
    - Reject if email not confirmed, offer to resend
- Binder
    - Show username somewhere
    - Search songs by title/artist
    - Tidy up Binder/Song actions
        - Maybe move them all to Song
    - Add "collections"
    - Set up printing
- Song Editing
    - Add ability to use columns
    - Spinner when saving
    - Add ability to move location of editor panel
    - Description of each scope choice
    - Link to help panel

### Security
- General
    - Figure out how to utilize the token
- Signup
    - Prevent login if email not confirmed
    - Passwords must be at least 8 characters
- Songs
    - Only user is allowed to edit their songs
    - Incorporate scope
        - Private: only the user can view
        - Friends: only user + friends can view
        - Public: anyone can view