const candidates = [
    {
        id: 1,
        avatar: "/images/resource/candidate-1.png",
        name: "Darlene Robertson",
        designation: "UI Designer",
        location: "London, UK",
        hourlyRate: "99",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 0,
            max: 10,
        },
        category: "Residential",
        gender: "Male",
        created_at: "Last Hour",
        experience: "Fresh",
        qualification: "Certificate",
    },
    {
        id: 2,
        avatar: "/images/resource/candidate-2.png",
        name: "Wade Warren",
        designation: "Developer",
        location: "London, UK",
        hourlyRate: "94",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 10,
            max: 20,
        },
        category: "Commercial",
        gender: "Female",
        created_at: "Last 24 Hour",
        experience: "1 Year",
        qualification: "Associate Degree",
    },
    {
        id: 3,
        avatar: "/images/resource/candidate-3.png",
        name: "Leslie Alexander",
        designation: "Marketing Expert",
        location: "London, UK",
        hourlyRate: "99",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 20,
            max: 30,
        },
        category: "Industrial",
        gender: "Others",
        created_at: "Last 7 Days",
        experience: "2 Year",
        qualification: "Bachelor Degree",
    },
    {
        id: 4,
        avatar: "/images/resource/candidate-4.png",
        name: "Floyd Miles",
        designation: "Charted Accountant",
        location: "London, UK",
        hourlyRate: "88",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 30,
            max: 40,
        },
        category: "Apartments",
        gender: "Male",
        created_at: "Last 14 Days",
        experience: "3 Year",
        qualification: "Master’s Degree",
    },
    {
        id: 5,
        avatar: "/images/resource/candidate-1.png",
        name: "Darlene Robertson",
        designation: "UI Designer",
        location: "London, UK",
        hourlyRate: "77",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 40,
            max: 50,
        },
        category: "Residential",
        gender: "Female",
        created_at: "Last 30 Days",
        experience: "4 Year",
        qualification: "Doctorate Degree",
    },
    {
        id: 6,
        avatar: "/images/resource/candidate-2.png",
        name: "Wade Warren",
        designation: "Developer",
        location: "London, UK",
        hourlyRate: "66",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 50,
            max: 60,
        },
        category: "Commercial",
        gender: "Others",
        created_at: "Last Hour",
        experience: "Fresh",
        qualification: "Certificate",
    },
    {
        id: 7,
        avatar: "/images/resource/candidate-3.png",
        name: "Leslie Alexander",
        designation: "Marketing Expert",
        location: "London, UK",
        hourlyRate: "99",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 60,
            max: 70,
        },
        category: "Industrial",
        gender: "Male",
        created_at: "Last 24 Hour",
        experience: "1 Year",
        qualification: "Associate Degree",
    },
    {
        id: 8,
        avatar: "/images/resource/candidate-4.png",
        name: "Floyd Miles",
        designation: "Charted Accountant",
        location: "London, UK",
        hourlyRate: "89",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 70,
            max: 80,
        },
        category: "Apartments",
        gender: "Female",
        created_at: "Last 7 Days",
        experience: "2 Year",
        qualification: "Bachelor Degree",
    },
    {
        id: 9,
        avatar: "/images/resource/candidate-1.png",
        name: "Darlene Robertson",
        designation: "UI Designer",
        location: "London, UK",
        hourlyRate: "79",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 80,
            max: 90,
        },
        category: "Residential",
        gender: "Others",
        created_at: "Last 14 Days",
        experience: "3 Year",
        qualification: "Master’s Degree",
    },
    {
        id: 10,
        avatar: "/images/resource/candidate-2.png",
        name: "Wade Warren",
        designation: "Developer",
        location: "London, UK",
        hourlyRate: "99",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 90,
            max: 100,
        },
        category: "Commercial",
        gender: "Male",
        created_at: "Last 30 Days",
        experience: "4 Year",
        qualification: "Doctorate Degree",
    },
    {
        id: 11,
        avatar: "/images/resource/candidate-3.png",
        name: "Leslie Alexander",
        designation: "Marketing Expert",
        location: "London, UK",
        hourlyRate: "34",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 0,
            max: 10,
        },
        category: "Industrial",
        gender: "Female",
        created_at: "Last Hour",
        experience: "Fresh",
        qualification: "Certificate",
    },
    {
        id: 12,
        avatar: "/images/resource/candidate-4.png",
        name: "Floyd Miles",
        designation: "Charted Accountant",
        location: "London, UK",
        hourlyRate: "99",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 10,
            max: 20,
        },
        category: "Apartments",
        gender: "Others",
        created_at: "Last 24 Hour",
        experience: "1 Year",
        qualification: "Associate Degree",
    },
    {
        id: 13,
        avatar: "/images/index-12/candidates/1.png",
        name: "lbert Flores",
        designation: "President of Sales",
        location: "London, UK",
        hourlyRate: "91",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 20,
            max: 30,
        },
        category: "Residential",
        gender: "Male",
        created_at: "Last 7 Days",
        experience: "2 Year",
        qualification: "Bachelor Degree",
    },
    {
        id: 14,
        avatar: "/images/index-12/candidates/2.png",
        name: "Jerome Bell",
        designation: "Marketing Coordinator",
        location: "London, UK",
        hourlyRate: "98",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 30,
            max: 40,
        },
        category: "Commercial",
        gender: "Female",
        created_at: "Last 14 Days",
        experience: "3 Year",
        qualification: "Master’s Degree",
    },
    {
        id: 15,
        avatar: "/images/index-12/candidates/3.png",
        name: "Darlene Robertson",
        designation: "Dog Trainer",
        location: "London, UK",
        hourlyRate: "99",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 40,
            max: 50,
        },
        category: "Industrial",
        gender: "Others",
        created_at: "Last 30 Days",
        experience: "4 Year",
        qualification: "Doctorate Degree",
    },
    {
        id: 16,
        avatar: "/images/index-12/candidates/4.png",
        name: "Theresa Webb",
        designation: "Web Designer",
        location: "London, UK",
        hourlyRate: "66",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 50,
            max: 60,
        },
        category: "Apartments",
        gender: "Male",
        created_at: "Last Hour",
        experience: "Fresh",
        qualification: "Certificate",
    },
    {
        id: 17,
        avatar: "/images/index-12/candidates/2.png",
        name: "Wade Warren",
        designation: "Developer",
        location: "London, UK",
        hourlyRate: "22",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 60,
            max: 70,
        },
        category: "Residential",
        gender: "Female",
        created_at: "Last 24 Hour",
        experience: "1 Year",
        qualification: "Associate Degree",
    },
    // candidate list v1 data
    {
        id: 18,
        avatar: "/images/resource/candidate-1.png",
        name: "Darlene Robertson",
        designation: "Ui Designer",
        location: "London, UK",
        hourlyRate: "44",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 70,
            max: 80,
        },
        category: "Commercial",
        gender: "Others",
        created_at: "Last 7 Days",
        experience: "2 Year",
        qualification: "Bachelor Degree",
    },
    {
        id: 19,
        avatar: "/images/resource/candidate-2.png",
        name: "Wade Warren",
        designation: "Developer",
        location: "London, UK",
        hourlyRate: "99",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 80,
            max: 90,
        },
        category: "Industrial",
        gender: "Male",
        created_at: "Last 14 Days",
        experience: "3 Year",
        qualification: "Master’s Degree",
    },
    {
        id: 20,
        avatar: "/images/resource/candidate-3.png",
        name: "Leslie Alexander",
        designation: "Digital Marketer",
        location: "London, UK",
        hourlyRate: "88",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 90,
            max: 100,
        },
        category: "Apartments",
        gender: "Female",
        created_at: "Last 30 Days",
        experience: "4 Year",
        qualification: "Doctorate Degree",
    },
    {
        id: 21,
        avatar: "/images/resource/candidate-4.png",
        name: "Floyd Miles",
        designation: "Front-end Developer",
        location: "London, UK",
        hourlyRate: "44",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 0,
            max: 10,
        },
        category: "Residential",
        gender: "Others",
        created_at: "Last Hour",
        experience: "1 Year",
        qualification: "Certificate",
    },
    {
        id: 22,
        avatar: "/images/resource/candidate-5.png",
        name: "Cameron Williamson",
        designation: "Backend Developer",
        location: "London, UK",
        hourlyRate: "99",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 10,
            max: 20,
        },
        category: "Commercial",
        gender: "Male",
        created_at: "Last 24 Hour",
        experience: "2 Year",
        qualification: "Associate Degree",
    },
    {
        id: 23,
        avatar: "/images/resource/candidate-6.png",
        name: "Robert Fox",
        designation: "Software Engineer",
        location: "London, UK",
        hourlyRate: "77",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 20,
            max: 30,
        },
        category: "Industrial",
        gender: "Female",
        created_at: "Last 7 Days",
        experience: "3 Year",
        qualification: "Bachelor Degree",
    },
    {
        id: 24,
        avatar: "/images/resource/candidate-7.png",
        name: "Esther Howard",
        designation: "Ui Designer",
        location: "London, UK",
        hourlyRate: "99",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 30,
            max: 40,
        },
        category: "Apartments",
        gender: "Others",
        created_at: "Last 14 Days",
        experience: "4 Year",
        qualification: "Master’s Degree",
    },
    {
        id: 25,
        avatar: "/images/resource/candidate-8.png",
        name: "Jerome Bell",
        designation: "Graphic Designer",
        location: "London, UK",
        hourlyRate: "66",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 40,
            max: 50,
        },
        category: "Residential",
        gender: "Male",
        created_at: "Last 30 Days",
        experience: "Fresh",
        qualification: "Doctorate Degree",
    },
    {
        id: 26,
        avatar: "/images/resource/candidate-9.png",
        name: "Annette Black",
        designation: "Content Writer",
        location: "London, UK",
        hourlyRate: "33",
        tags: ["App", "Design", "Digital"],
        destination: {
            min: 50,
            max: 60,
        },
        category: "Commercial",
        gender: "Female",
        created_at: "Last Hour",
        experience: "1 Year",
        qualification: "Certificate",
    },
];
export default  candidates