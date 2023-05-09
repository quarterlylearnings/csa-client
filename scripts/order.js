const basketsContainer = document.getElementById('baskets-container');
const orderList = document.getElementById('order-list');
const submitOrderBtn = document.getElementById('submit-order');

const token = localStorage.getItem('csa-frontend-token');
const order = [];

async function fetchBaskets() {
  const response = await fetch('http://localhost:3000/baskets', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error('Failed to fetch baskets.');
}

function createBasketElement(basket) {
  const basketElement = document.createElement('div');
  basketElement.innerHTML = `<h3>${basket.name} - $${basket.price}</h3>`;
  basketElement.style.cursor = 'pointer';

  basketElement.addEventListener('click', () => {
    order.push(basket);
    const listItem = document.createElement('li');
    listItem.textContent = `${basket.name} - $${basket.price}`;
    orderList.appendChild(listItem);
  });

  return basketElement;
}

async function init() {
  try {
    const baskets = await fetchBaskets();

    baskets.forEach((basket) => {
      const basketElement = createBasketElement(basket);
      basketsContainer.appendChild(basketElement);
    });
  } catch (error) {
    console.error(error);
    alert('An error occurred while fetching baskets.');
  }
}

submitOrderBtn.addEventListener('click', async () => {
  const orderIds = order.map((basket) => basket.id);

  // once the orders route is implemented 👇🏾
//   const response = await fetch('http://localhost:3000/orders', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({  }),
//   });

  if (response.ok) {
    alert('Order submitted successfully!');
    window.location.reload();
  } else {
    alert('An error occurred while submitting the order.');
  }
});

init();
