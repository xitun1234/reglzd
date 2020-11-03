// function copyToClipboard(text) {
//     var textArea = document.createElement("textarea");
//     textArea.value = text;
//     document.body.appendChild(textArea);
//     textArea.select();
//     document.execCommand('copy');
//     document.body.removeChild(textArea);
// }

// $(document).ready(function () {
//     $('#selectAllAccount').click(function () {

//         if ($(this).val() == "selectAll") {
//             $(".checkBoxAccountClone").prop("checked", true);

//             $(this).text('Deselect All');
//             $(this).val('deselectAll');
//         } else {
//             $(this).text('Select All');
//             $(this).val('selectAll');
//             $(".checkBoxAccountClone").prop("checked", false);
//         }

//     })

//     $('#copyAllAccountSelected').click(function () {
//         $(this).html('<i class="fa fa-check" aria-hidden="true"></i> Copied');
//         let clipboardLinkAccount = "";
//         $('.checkBoxAccountClone:checkbox:checked').each(function () {
//             clipboardLinkAccount += "\r\n" + $(this).attr("linkAccount");
//         });
//         copyToClipboard(clipboardLinkAccount.replace(/^\s*\n/gm, ""))
//         setTimeout(() => {
//             $(this).html('Copy');
//         }, 5000)

//     })
//     $('table').show()
//     $('#tableListAccount').DataTable({
//         responsive: true,
//         "lengthMenu": [ [200, 500, 1000, -1], [200, 500, 1000, "Tất cả"] ],
//         "language": {
//             "lengthMenu":     "Hiển thị _MENU_ kết quả",
//             "paginate": {
//                 "first":      "Đầu",
//                 "last":       "Cuối",
//                 "next":       "Tiếp",
//                 "previous":   "Trước"
//             },
//             "search":         "Tìm kiếm:",
//             "loadingRecords": "Đang tải...",
//             "processing":     "Đang xử lý...",
//             "emptyTable":     "Không có dữ liệu",
//             "info":           "Hiển thị _START_/_END_ (_TOTAL_ kết quả)",
//             "infoEmpty":      "Không có dữ liệu để hiển thị",
//             "thousands":      ".",
//             "zeroRecords":    "Không tìm thấy kết quả tìm kiếm",
//             "infoFiltered":   "(lọc từ _MAX_ kết quả)",
//             "aria": {
//                 "sortAscending":  ": Sắp xếp tăng dần",
//                 "sortDescending": ": Sắp xếp giảm dần"
//             }
//         }
//     });

// });