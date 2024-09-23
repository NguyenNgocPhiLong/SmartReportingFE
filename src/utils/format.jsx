// Hàm formatDate chuyển đổi ngày từ định dạng đầu vào thành định dạng ngày 'ngày/tháng/năm'
export const formatDate = (value) => new Date(value).toLocaleDateString('en-GB')

// Hàm formatPhone định dạng số điện thoại từ chuỗi đầu vào
export const formatPhone = (input) => {
    input = input.replace(/\D/g, '');
    input = input.substring(0, 10);

    var size = input.length;
    if (size == 0) {
        // Nếu chuỗi rỗng, giữ nguyên chuỗi
        input = input;
    } else if (size < 4) {
        input = '(' + input;
    } else if (size < 7) {
        input = input.substring(0, 3) + '-' + input.substring(3, 6);
    } else {
        // Nếu chuỗi có từ 7 ký tự trở lên, định dạng số điện thoại đầy đủ với dấu ngoặc đơn, khoảng trắng và dấu gạch nối
        input = input.substring(0, 3) + '-' + input.substring(3, 6) + '-' + input.substring(6, 10);
    }
    return input;
}
