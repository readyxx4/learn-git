$(document).ready(function () {
  const modal = $("#inputModal");

  // เปิด modal
  $("#openModal").click(function () {
    modal.show();
  });

  // ปิด modal
  $(window).click(function (e) {
    if (e.target.id === "inputModal") {
      modal.hide();
    }
  });

  
  loadTable();

  $("#calcForm").submit(function (e) {
    e.preventDefault();

    const input1 = parseFloat($("#input1").val());
    const input2 = parseFloat($("#input2").val());
    const input3 = parseFloat($("#input3").val());
    const operation = $("#operation").val();
    const dateInput = $("#dateInput").val();

    // ตรวจสอบวันที่
    const today = new Date().toISOString().split("T")[0];
    if (dateInput !== today) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "วันที่ไม่ตรงกับปัจจุบัน!",
      });
      return;
    }

    // คำนวณ
    let equation = `${input1}${operation}${input2}`;
    let result1 = eval(equation); 
    let finalEquation = `${equation}+${input3}`;
    let result = result1 + input3;

    // เก็บเป็น object
    const data = { input1, input2, input3, equation: finalEquation, result };

    // เก็บลง localStorage
    let stored = JSON.parse(localStorage.getItem("calcData")) || [];
    stored.push(data);
    localStorage.setItem("calcData", JSON.stringify(stored));

    // แสดงผล
    addRow(data);

    // ปิด modal
    modal.hide();
  });


  // ฟังก์ชันเพิ่มแถว
  function addRow(data) {
    const tr = $("<tr></tr>");
    tr.append(`<td>${data.input1}</td>`);
    tr.append(`<td>${data.input2}</td>`);
    tr.append(`<td>${data.input3}</td>`);
    tr.append(`<td>${data.equation}</td>`);
    if (data.result < 0) {
      tr.append(`<td class="result-negative">${data.result}</td>`);
    } else {
      tr.append(`<td>${data.result}</td>`);
    }
    $("#resultTable").append(tr);
  }

  // โหลดข้อมูลเดิม
  function loadTable() {
    let stored = JSON.parse(localStorage.getItem("calcData")) || [];
    stored.forEach(addRow);
  }
  // ล้างข้อมูลทั้งหมด
$("#clearData").click(function () {
  Swal.fire({
    title: 'คุณแน่ใจหรือไม่?',
    text: "ข้อมูลทั้งหมดจะถูกลบไม่สามารถกู้คืนได้!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ใช่ ลบเลย',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("calcData"); // ลบข้อมูลใน localStorage
      $("#resultTable").empty(); // ล้างตาราง
      Swal.fire(
        'ลบแล้ว!',
        'ข้อมูลทั้งหมดถูกลบเรียบร้อย.',
        'success'
      );
    }
  });
});
});