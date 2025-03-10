# Calendar Proxy API

A simple proxy API that fetches ICS calendar files from a Zimbra server using HTTP Basic Authentication and returns them to clients like Google Calendar.

## Purpose

This API solves the problem of syncing a Zimbra calendar that requires authentication with Google Calendar. Google Calendar doesn't support sending authentication credentials when fetching ICS files, so this proxy handles the authentication and forwards the calendar data.

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   cd calendar-api
   npm install
   ```
3. Create a `.env` file based on the `.env.example` template:
   ```
   ZIMBRA_BASE_URL=http://your-college-zimbra-url.com/path-to-ics
   PORT=3000
   ```
4. Start the server:
   ```
   npm start
   ```

## Usage

Once the server is running, you can use the API with the following URL format:

```
http://your-server-address:3000/calendar?username=your-username&password=your-password
```

### Adding to Google Calendar

1. In Google Calendar, click the "+" next to "Other calendars"
2. Select "From URL"
3. Enter the URL with your Zimbra credentials:
   ```
   http://your-server-address:3000/calendar?username=your-username&password=your-password
   ```
4. Click "Add calendar"

Google Calendar will now fetch your Zimbra calendar through the proxy API.

## Security Considerations

- This API transmits your Zimbra credentials in URL parameters, which may be logged by servers or visible in browser history.
- Consider running this on a secure server with HTTPS enabled for production use.
- You may want to add additional authentication to the API itself if it's publicly accessible.

## License

MIT 