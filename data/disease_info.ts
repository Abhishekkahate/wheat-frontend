export interface DiseaseDetail {
    description: string;
    symptoms: string[];
    prevention: string[];
}

export const diseaseData: Record<string, DiseaseDetail> = {
    "Leaf Rust": {
        description: "Leaf rust is a fungal disease that affects wheat stems, leaves, and grains. It appears as small, round, orange-red pustules on the upper surface of the leaf.",
        symptoms: [
            "Small, round, orange-red pustules on leaves",
            "Pustules may be scattered or clustered",
            "Leaves turn yellow and dry up"
        ],
        prevention: [
            "Use resistant wheat varieties",
            "Control volunteer wheat plants",
            "Apply fungicides early in the season"
        ]
    },
    "Yellow Rust": {
        description: "Yellow rust (stripe rust) causes yellow stripes on leaves. It thrives in cool, moist weather and can significantly reduce yields.",
        symptoms: [
            "Yellow stripes of pustules on leaves",
            "Stunted growth",
            "Shriveled grains"
        ],
        prevention: [
            "Plant resistant cultivars",
            "Monitor fields regularly",
            "Apply appropriate fungicides"
        ]
    },
    "Powdery Mildew": {
        description: "Powdery mildew appears as white, fluffy fungal growth on leaves and stems. It reduces photosynthesis and weakens the plant.",
        symptoms: [
            "White, powdery spots on leaves and stems",
            "Leaves turning yellow and dying",
            "Reduced plant vigor"
        ],
        prevention: [
            "Avoid excessive nitrogen fertilization",
            "Ensure good air circulation",
            "Use resistant varieties"
        ]
    },
    "Septoria": {
        description: "Septoria leaf blotch causes irregular brown spots on leaves with small black dots. It spreads rapidly in wet conditions.",
        symptoms: [
            "Irregular brown lesions on leaves",
            "Small black fruiting bodies within lesions",
            "Premature leaf death"
        ],
        prevention: [
            "Crop rotation",
            "Deep plowing of crop residues",
            "Fungicide application"
        ]
    },
    "Healthy": {
        description: "The plant appears healthy with no visible signs of disease. Continue standard care practices.",
        symptoms: [
            "No visible lesions or discoloration",
            "Vigorous growth",
            "Normal leaf color"
        ],
        prevention: [
            "Maintain regular monitoring",
            "Ensure proper irrigation and fertilization",
            "Practice good field hygiene"
        ]
    }
};

export const getDiseaseDetails = (diseaseName: string): DiseaseDetail | null => {
    const normalizedInput = diseaseName.toLowerCase().replace(/_/g, ' ').replace(/wheat/g, '').trim();

    // Direct mapping for common dataset labels
    const map: Record<string, string> = {
        "brown rust": "Leaf Rust",
        "stripe rust": "Yellow Rust",
        "leaf rust": "Leaf Rust",
        "yellow rust": "Yellow Rust",
        "powdery mildew": "Powdery Mildew",
        "septoria": "Septoria",
        "healthy": "Healthy" // We might want to handle healthy differently
    };

    // Check against map keys
    for (const key in map) {
        if (normalizedInput.includes(key)) {
            return diseaseData[map[key]];
        }
    }

    // Fallback to original fuzzy match
    const key = Object.keys(diseaseData).find(k => normalizedInput.includes(k.toLowerCase()));
    return key ? diseaseData[key] : null;
};
