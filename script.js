// 1. التنقل بين الصفحات
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        const pageId = this.getAttribute('data-page');
        document.getElementById(pageId).classList.add('active');
        document.getElementById('page-title').innerText = this.innerText;
    });
});

// 2. إدارة النوافذ (Modals)
function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// 3. زر الإضاءة
const themeBtn = document.getElementById('theme-toggle');
themeBtn.onclick = () => {
    document.body.classList.toggle('dark');
    const icon = themeBtn.querySelector('i');
    icon.className = document.body.classList.contains('dark') ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
};

// 4. حفظ اليومية (الحسابات التلقائية الـ 13 عمود)
function saveDaily() {
    const qty = parseFloat(document.getElementById('dQty').value) || 0;
    const price = parseFloat(document.getElementById('dPrice').value) || 0;
    const paid = parseFloat(document.getElementById('dPaid').value) || 0;
    const total = qty * price;
    const balance = total - paid;

    const row = `<tr>
        <td style="font-weight:bold">${document.getElementById('dClient').value}</td>
        <td>${document.getElementById('dReceiver').value}</td>
        <td>${document.getElementById('dCode').value}</td>
        <td>${document.getElementById('dNote').value}</td>
        <td>${document.getElementById('dCount').value}</td>
        <td>${document.getElementById('dWeight').value}</td>
        <td>${qty}</td><td>${price}</td>
        <td style="font-weight:bold; color:var(--primary)">${total}</td>
        <td style="color:green">${paid}</td>
        <td style="color:red; font-weight:bold">${balance}</td>
        <td>${document.getElementById('dRemark').value}</td>
        <td><i class="fa-solid fa-trash" style="color:#ef4444; cursor:pointer" onclick="this.parentElement.parentElement.remove()"></i></td>
    </tr>`;
    document.getElementById('bodyDaily').innerHTML += row;
    closeModal('modalDaily');
    document.querySelectorAll('#modalDaily input').forEach(i => i.value = "");
}

// 5. حفظ الأرصدة
function saveBalance() {
    const total = parseFloat(document.getElementById('bTotal').value) || 0;
    const paid = parseFloat(document.getElementById('bPaid').value) || 0;
    const row = `<tr>
        <td>${document.getElementById('bRep').value}</td><td>${document.getElementById('bClient').value}</td>
        <td>${total}</td><td>${paid}</td><td style="color:red;font-weight:bold">${total - paid}</td>
        <td><i class="fa-solid fa-trash" style="color:#ef4444; cursor:pointer" onclick="this.parentElement.parentElement.remove()"></i></td>
    </tr>`;
    document.getElementById('bodyBalances').innerHTML += row;
    closeModal('modalBalance');
}

// 6. حفظ المخزن
function saveInventory() {
    const start = parseFloat(document.getElementById('iStart').value) || 0;
    const price = parseFloat(document.getElementById('iPrice').value) || 0;
    const row = `<tr>
        <td>${document.getElementById('iCode').value}</td><td>${document.getElementById('iName').value}</td>
        <td>${start}</td><td>0</td><td>0</td><td>${start}</td><td>${price}</td><td>${start*price}</td>
        <td><i class="fa-solid fa-trash" style="color:#ef4444; cursor:pointer" onclick="this.parentElement.parentElement.remove()"></i></td>
    </tr>`;
    document.getElementById('bodyInventory').innerHTML += row;
    closeModal('modalInventory');
}

// 7. كشف الحساب التراكمي
let runningBalance = 0;
function saveStatement() {
    const debit = parseFloat(document.getElementById('sDebit').value) || 0;
    const credit = parseFloat(document.getElementById('sCredit').value) || 0;
    runningBalance += (debit - credit);
    const row = `<tr>
        <td>${document.getElementById('sDate').value}</td><td>${document.getElementById('sNote').value}</td>
        <td style="color:green">${debit}</td><td style="color:red">${credit}</td><td style="font-weight:bold">${runningBalance}</td>
        <td><i class="fa-solid fa-trash" style="color:#ef4444; cursor:pointer" onclick="this.parentElement.parentElement.remove()"></i></td>
    </tr>`;
    document.getElementById('bodyStatement').innerHTML += row;
    closeModal('modalStatement');
}

// 8. الرسم البياني وتاريخ اليوم
window.onload = () => {
    document.getElementById('dashDate').innerText = new Date().toLocaleDateString('ar-EG');
    const ctx = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس'],
            datasets: [{
                label: 'إحصائيات الأسبوع',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: '#7c3aed',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(124, 58, 237, 0.1)'
            }]
        },
        options: { plugins: { legend: { display: false } } }
    });
};
