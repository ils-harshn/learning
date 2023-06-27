export const extractEmailUsername = (email) => email.split('@')[0]

export const getTimeFromFBTimeStamp = (fbTimestamp) => {
    const jsDate = fbTimestamp.toDate();

    // Define options for date formatting
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };

    // Format the date using toLocaleString()
    const formattedDate = jsDate.toLocaleString('en-US', options);

    return formattedDate
}