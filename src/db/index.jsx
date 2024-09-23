// Đối tượng chứa dữ liệu người dùng
export const db = {
    users: [
        {
            id: 1, 
            fullName: 'NGUYEN VAN A', 
            DateBirth: "03/04/2002",
            sex: "Nam", 
            phone: "0935017200", 
            cccd: "1974393801", 
            email: "nguyenvana@gmail.com", 
            position: 0, // Vị trí (sử dụng giá trị enum)
            status: 0,
            contractTypeL: 0, 
            startDate: "08/09/2024", 
            endDate: "08/09/2024", 
        },
        {
            id: 2,
            fullName: 'NGUYEN VAN B',
            DateBirth: "03/04/2002", 
            sex: "Nam", 
            phone: "0935017200", 
            cccd: "1974393801",
            email: "nguyenvanb@gmail.com", 
            position: 0, 
            status: 0, 
            contractTypeL: 0, 
            startDate: "08/09/2024",
            endDate: "08/09/2024",
        },
        {
            id: 3, 
            fullName: 'NGUYEN VAN c', 
            DateBirth: "03/04/2002", 
            sex: "Nam", 
            phone: "0935017300", 
            cccd: "1974393811", 
            email: "nguyenvanc@gmail.com",
            position: 1, 
            status: 1, 
            contractTypeL: 1, 
            startDate: "08/09/2024",
            endDate: "08/09/2024",
        },
    ],
}


// Đối tượng chứa các giá trị enum cho người dùng
export const newEnumUser = {
    position: {
        testing: 0,
        FE: 1, 
        BE: 2
    },
    status: {
        active: "active",
        inactive: "inactive"
    },
   
    contract: { 
        internship: "internship", 
        Trial: 1,  
        Official: 2
    }
}
