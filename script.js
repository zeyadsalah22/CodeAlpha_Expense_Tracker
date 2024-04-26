const form = document.getElementById('expense-form');
        const deleteAllButton = document.getElementById('delete-all');
        const categorySelect = document.getElementById('expense-category');
        const amountInput = document.getElementById('expense-amount');
        const dateInput = document.getElementById('expense-date');
        const list = document.getElementById('expense-list');
        const totalRow = document.getElementById('total-row');

        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        let nextId = expenses.length ? Math.max(...expenses.map(expense => expense.id)) + 1 : 1;

        function editExpense(id) {
            const expense = expenses.find(expense => expense.id === id);
            categorySelect.value = expense.category;
            amountInput.value = expense.amount;
            dateInput.value = expense.date;
            deleteExpense(id);
        }

        function deleteExpense(id) {
            expenses = expenses.filter(expense => expense.id !== id);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            list.innerHTML = '';
            expenses.forEach(expense => renderExpense(expense.id, expense.category, expense.amount, expense.date));
            renderTotal();
        }

        function addExpense(category, amount, date) {
            const id = nextId++;
            expenses.push({ id, category, amount, date });
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpense(id, category, amount, date);
            renderTotal();
        }

        function renderExpense(id, category, amount, date) {
            list.innerHTML += `<tr><td>${category}</td><td>$${amount}</td><td>${date}</td><td><button class="btn btn-light" onclick="editExpense(${id})">Edit</button><button class="btn btn-light" onclick="deleteExpense(${id})">Delete</button></td></tr>`;
        }

        function renderTotal() {
            const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
            totalRow.innerHTML = `<tr id="total"><td>Total</td><td>$${total.toFixed(2)}</td><td></td><td></td></tr>`;
        }

        function deleteAllExpenses() {
            expenses = [];
            localStorage.setItem('expenses', JSON.stringify(expenses));
            list.innerHTML = '';
            totalRow.innerHTML = '';
        }

        form.addEventListener('submit', function(event) {
            event.preventDefault();
            addExpense(categorySelect.value, amountInput.value, dateInput.value);
            categorySelect.value = '';
            amountInput.value = '';
            dateInput.value = '';
        });

        deleteAllButton.addEventListener('click', deleteAllExpenses);

        expenses.forEach(expense => renderExpense(expense.id, expense.category, expense.amount, expense.date));
        renderTotal();