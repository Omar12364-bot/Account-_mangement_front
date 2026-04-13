// 1. التنقل بين الصفحات (يدعم الكمبيوتر والموبايل)
document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        const pageId = this.getAttribute('data-page');
        if(document.getElementById(pageId)) {
            document.getElementById(pageId).classList.add('active');
            document.getElementById('page-title').innerText = this.innerText;
        }
    });
});

// 2. إدارة النوافذ (Modals)
function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// 3. زر الإضاءة مع خاصية الثبات (Local Storage)
const themeBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// التأكد من الثبات عند تحميل الصفحة
if (currentTheme === 'dark') {
    document.body.classList.add('dark');
    if(themeBtn) themeBtn.querySelector('i').className = 'fa-solid fa-moon';
}

if(themeBtn) {
    themeBtn.onclick = () => {
        document.body.classList.toggle('dark');
        let theme = 'light';
        
        if (document.body.classList.contains('dark')) {
            theme = 'dark';
            themeBtn.querySelector('i').className = 'fa-solid fa-moon';
        } else {
            themeBtn.querySelector('i').className = 'fa-solid fa-sun';
        }
        // حفظ الاختيار في ذاكرة المتصفح
        localStorage.setItem('theme', theme);
    };
}

// 4. حفظ اليومية (13 عمود)
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

// 5. حفظ المخزن (مع الـ 6 أعمدة في الآخر)
function saveInventory() {
    const code = document.getElementById('iCode').value;
    const name = document.getElementById('iName').value;
    const carNum = document.getElementById('iCarNumber').value;
    const c1 = document.getElementById('col1').value || 0;
    const c2 = document.getElementById('col2').value || 0;
    const c3 = document.getElementById('col3').value || 0;
    const c4 = document.getElementById('col4').value || 0;
    const c5 = document.getElementById('col5').value || 0;
    const c6 = document.getElementById('col6').value || 0;
    const start = parseFloat(document.getElementById('iStart').value) || 0;
    const incoming = parseFloat(document.getElementById('iIn').value) || 0;
    const outgoing = parseFloat(document.getElementById('iOut').value) || 0;
    const price = parseFloat(document.getElementById('iPrice').value) || 0;
    let stockValueInput = parseFloat(document.getElementById('iTotalValue').value);
    
    const finalQty = (start + incoming) - outgoing;
    const finalStockValue = isNaN(stockValueInput) ? (finalQty * price) : stockValueInput;

    if (!carNum) { alert("يرجى إدخال رقم السيارة"); return; }

    const row = `<tr>
        <td>${code}</td><td>${name}</td>
        <td style="font-weight:bold; color:var(--primary)">سيارة ${carNum}</td>
        <td>${start}</td><td style="color:green">${incoming}</td><td style="color:red">${outgoing}</td>
        <td style="font-weight:bold">${finalQty}</td><td>${price} ج</td>
        <td style="background: rgba(124, 58, 237, 0.05); font-weight:bold; color:var(--primary)">${finalStockValue} ج</td>
        <td>${c1}</td><td>${c2}</td><td>${c3}</td><td>${c4}</td><td>${c5}</td><td>${c6}</td>
        <td><i class="fa-solid fa-trash" style="color:#ef4444; cursor:pointer" onclick="this.parentElement.parentElement.remove()"></i></td>
    </tr>`;

    document.getElementById('bodyInventory').innerHTML += row;
    closeModal('modalInventory');
    document.querySelectorAll('#modalInventory input').forEach(i => i.value = "");
}

// 6. حفظ الأرصدة (اللي كان واقف عندك)
function saveBalance() {
    const rep = document.getElementById('bRep').value;
    const client = document.getElementById('bClient').value;
    const total = parseFloat(document.getElementById('bTotal').value) || 0;
    const paid = parseFloat(document.getElementById('bPaid').value) || 0;
    const row = `<tr>
        <td>${rep}</td><td>${client}</td>
        <td>${total} ج</td><td>${paid} ج</td><td style="color:red;font-weight:bold">${total - paid} ج</td>
        <td><i class="fa-solid fa-trash" style="color:#ef4444; cursor:pointer" onclick="this.parentElement.parentElement.remove()"></i></td>
    </tr>`;
    document.getElementById('bodyBalances').innerHTML += row;
    closeModal('modalBalance');
    document.querySelectorAll('#modalBalance input').forEach(i => i.value = "");
}

// 7. كشف الحساب التراكمي
let runningBalance = 0;
function saveStatement() {
    const clientName = document.getElementById('sClient').value;
    const date = document.getElementById('sDate').value;
    const note = document.getElementById('sNote').value;
    const debit = parseFloat(document.getElementById('sDebit').value) || 0;
    const credit = parseFloat(document.getElementById('sCredit').value) || 0;
    runningBalance += (debit - credit);

    const row = `<tr>
        <td style="font-weight:bold; color:var(--primary)">${clientName}</td>
        <td>${date}</td><td>${note}</td>
        <td style="color:green; font-weight:bold">${debit}</td>
        <td style="color:red; font-weight:bold">${credit}</td>
        <td style="background: #f8fafc; font-weight:800">${runningBalance}</td>
        <td><i class="fa-solid fa-trash" style="color:#ef4444; cursor:pointer" onclick="deleteStatementRow(this, ${debit}, ${credit})"></i></td>
    </tr>`;
    document.getElementById('bodyStatement').innerHTML += row;
    closeModal('modalStatement');
    document.querySelectorAll('#modalStatement input').forEach(i => i.value = "");
}

function deleteStatementRow(btn, debit, credit) {
    runningBalance -= (debit - credit);
    btn.parentElement.parentElement.remove();
}

// 8. تشغيل الرسم البياني عند التحميل
window.onload = () => {
    if(document.getElementById('dashDate')) document.getElementById('dashDate').innerText = new Date().toLocaleDateString('ar-EG');
    const chartEl = document.getElementById('revenueChart');
    if(chartEl) {
        const ctx = chartEl.getContext('2d');
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
    }
};
