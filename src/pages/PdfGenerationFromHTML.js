import axios from "axios";
import { useState } from "react";

const PdfGenerationFromHTML = () => {
  const [loading, setLoading] = useState(false);

  function printBlock(htmlContent) {
    // Create a new HTMLDocument object
    var printDocument =
      document.implementation.createHTMLDocument("Printed Block");

    // Set the HTML content of the document body
    printDocument.body.innerHTML = htmlContent;

    // Open a new window
    var printWindow = window.open("", "_blank");

    // Write the HTML content into the new window
    printWindow.document.write(printDocument.documentElement.outerHTML);

    // Close the document so that print dialog opens
    printWindow.document.close();

    // Print the content
    printWindow.print();
  }

  const getUsersPDF = async () => {
    setLoading(true);
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        let data = response.data;
        setLoading(false);
        let content = `
        <table id="userTable">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Company</th>
            </tr>
            </thead>
                <tbody>`;

        data.forEach(function (user) {
          content += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.address.street}, ${user.address.city}, ${user.address.zipcode}</td>
                <td>${user.phone}</td>
                <td>${user.website}</td>
                <td>${user.company.name}</td>
            </tr>
            `;
        });

        content += `
                </tbody>
            </table>`;
        printBlock(content);
        return response.data;
      })
      .catch((error) => error);
  };
  return (
    <div>
      <button onClick={getUsersPDF}>Generate PDF</button>
      <div>{loading ? "loading" : ""}</div>
    </div>
  );
};

export default PdfGenerationFromHTML;
