import * as lucide from 'lucide-react';

console.log('Checking imports...');
const icons = [
    'ArrowRight', 'Zap', 'ShieldCheck', 'Smartphone', // Hero
    'Menu', 'X', 'Sprout', // Navbar
    'Upload', 'AlertTriangle', 'CheckCircle', 'Image', 'Loader2', // ModelInterface
    'Cpu', 'Database', 'Layers', // ProjectDetails
    'Github', 'Linkedin', 'User' // Team
];

icons.forEach(icon => {
    if (!lucide[icon]) {
        console.error(`Missing icon: ${icon}`);
    } else {
        console.log(`Found icon: ${icon}`);
    }
});
