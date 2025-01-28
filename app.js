/* Initialize the dashboard after the DOM is fully loaded */
document.addEventListener('DOMContentLoaded', () => {
    const stockData = JSON.parse(stockContent);
    const usersData = JSON.parse(userContent);
  
    renderUserList(usersData, stockData);
  
    const deleteBtn = document.querySelector('#btnDelete');
    const saveBtn = document.querySelector('#btnSave');
  
    // Handle user deletion
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const userId = document.querySelector('#userID').value;
      deleteUser(userId, usersData, stockData);
    });
  
    // Handle user details saving
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      saveUserDetails(usersData, stockData);
    });
  });
  
  /* Generate the list of users dynamically */
  function renderUserList(users, stocks) {
    const userContainer = document.querySelector('.user-list');
    userContainer.innerHTML = '';
  
    users.forEach(({ user, id }) => {
      const userElement = document.createElement('li');
      userElement.textContent = `${user.lastname}, ${user.firstname}`;
      userElement.dataset.userId = id;
      userContainer.appendChild(userElement);
    });
  
    // Attach a click listener to handle user selection
    userContainer.addEventListener('click', (event) => {
      const selectedUserId = event.target.dataset.userId;
      const selectedUser = users.find((u) => u.id == selectedUserId);
      if (selectedUser) {
        showUserDetails(selectedUser);
        displayPortfolio(selectedUser, stocks);
      }
    });
  }
  
  /* Delete a user and refresh the dashboard */
  function deleteUser(userId, users, stocks) {
    const userIndex = users.findIndex((u) => u.id == userId);
  
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      clearUserDetails();
      clearPortfolio();
      renderUserList(users, stocks);
    }
  }
  
  /* Clear the user details form */
  function clearUserDetails() {
    document.querySelector('#userID').value = '';
    document.querySelector('#firstname').value = '';
    document.querySelector('#lastname').value = '';
    document.querySelector('#address').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#email').value = '';
  }
  
  
  /* Display user details in the form */
  function showUserDetails(userRecord) {
    const { user, id } = userRecord;
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
  }
  
  /* Render the portfolio of the selected user */
  function displayPortfolio(userRecord, stockData) {
    const portfolioContainer = document.querySelector('.portfolio-list');
    portfolioContainer.innerHTML = '';
  
    userRecord.portfolio.forEach(({ symbol, owned }) => {
      const stockElement = document.createElement('p');
      const sharesElement = document.createElement('p');
      const viewButton = document.createElement('button');
  
      stockElement.textContent = `Stock: ${symbol}`;
      sharesElement.textContent = `Shares Owned: ${owned}`;
      viewButton.textContent = 'View Stock';
      viewButton.dataset.symbol = symbol;
  
      portfolioContainer.appendChild(stockElement);
      portfolioContainer.appendChild(sharesElement);
      portfolioContainer.appendChild(viewButton);
    });
  
    portfolioContainer.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        const symbol = event.target.dataset.symbol;
        if (symbol) {
          displayStockDetails(symbol, stockData);
        }
      }
    });
  }
  
  
  /* Clear the portfolio display */
  function clearPortfolio() {
    document.querySelector('.portfolio-list').innerHTML = '';
  }
  
  /* Save updated user details */
  function saveUserDetails(users, stocks) {
    const userId = document.querySelector('#userID').value;
    const userRecord = users.find((u) => u.id == userId);
  
    if (userRecord) {
      userRecord.user.firstname = document.querySelector('#firstname').value;
      userRecord.user.lastname = document.querySelector('#lastname').value;
      userRecord.user.address = document.querySelector('#address').value;
      userRecord.user.city = document.querySelector('#city').value;
      userRecord.user.email = document.querySelector('#email').value;
  
      renderUserList(users, stocks);
    }
  }
  
  /* Show detailed information about a specific stock */
  function displayStockDetails(symbol, stocks) {
    const stockInfo = stocks.find((stock) => stock.symbol == symbol);
    if (stockInfo) {
      document.querySelector('#stockName').textContent = stockInfo.name;
      document.querySelector('#stockSector').textContent = stockInfo.sector;
      document.querySelector('#stockIndustry').textContent = stockInfo.subIndustry;
      document.querySelector('#stockAddress').textContent = stockInfo.address;
      document.querySelector('#logo').src = `logos/${symbol}.svg`;
    }
  }
  
  