
const TRAINERS = [
    {
        id: 't1',
        name: 'Alex Johnson',
        specialties: ['Muscle Gain', 'Strength Training'],
        experience: 8,
        rating: 4.9,
        location: 'New York',
        availability: ['Mon', 'Wed', 'Fri'],
        bio: 'Certified strength coach helping you build muscle and confidence.',
        image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1887&auto=format&fit=crop',
        email: 'alex.j@wellnest_trainers.com',
        phone: '+1 (555) 012-3456'
    },
    {
        id: 't2',
        name: 'Sarah Lee',
        specialties: ['Yoga', 'Flexibility', 'Mental Wellness'],
        experience: 5,
        rating: 4.8,
        location: 'Online',
        availability: ['Tue', 'Thu', 'Sat'],
        bio: 'Yoga instructor focused on holistic health and mindfulness.',
        image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop',
        email: 'sarah.yoga@wellnest_trainers.com',
        phone: '+1 (555) 012-7890'
    },
    {
        id: 't3',
        name: 'Mike Chen',
        specialties: ['Weight Loss', 'HIIT', 'Cardio'],
        experience: 6,
        rating: 4.7,
        location: 'San Francisco',
        availability: ['Mon', 'Tue', 'Thu', 'Fri'],
        bio: 'High energy trainer specialized in fat loss and metabolic conditioning.',
        image: 'https://images.unsplash.com/photo-1627931105822-6b99d5543c3a?u=4r&q=80&w=2000&auto=format&fit=crop',
        email: 'mike.chen@wellnest_trainers.com',
        phone: '+1 (555) 012-4567'
    },
    {
        id: 't4',
        name: 'Jessica Davis',
        specialties: ['Rehabilitation', 'Mobility', 'Senior Fitness'],
        experience: 12,
        rating: 5.0,
        location: 'Chicago',
        availability: ['Wed', 'Fri'],
        bio: 'Helping you recover from injuries and move pain-free.',
        image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
        email: 'jessica.rehab@wellnest_trainers.com',
        phone: '+1 (555) 012-8901'
    },
    {
        id: 't5',
        name: 'David Kim',
        specialties: ['CrossFit', 'Endurance', 'Muscle Gain'],
        experience: 4,
        rating: 4.6,
        location: 'Online',
        availability: ['Sat', 'Sun'],
        bio: 'Pushing your limits with functional fitness and endurance training.',
        image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1887&auto=format&fit=crop',
        email: 'david.fit@wellnest_trainers.com',
        phone: '+1 (555) 012-2345'
    }
];

export const getAllTrainers = () => {
    return TRAINERS;
};

export const matchTrainers = (criteria) => {
    return TRAINERS.filter(trainer => {
        // Match Goal,if selected, check if any specialty matches vaguely or exactly
        let goalMatch = true;
        if (criteria.goal && criteria.goal !== 'All') {
            goalMatch = trainer.specialties.some(s => s.toLowerCase().includes(criteria.goal.toLowerCase()));
            if (!goalMatch && criteria.goal === 'Weight Loss') {
                goalMatch = trainer.specialties.some(s => ['HIIT', 'Cardio'].includes(s));
            }
        }

        // Match Location,Online matches everyone if user accepts online, specific city otherwise
        let locationMatch = true;
        if (criteria.location && criteria.location !== 'Any') {
            if (criteria.location === 'Online') {
                locationMatch = trainer.location === 'Online';
            } else {
                locationMatch = trainer.location.toLowerCase() === criteria.location.toLowerCase() || trainer.location === 'Online';
            }
        }

        return goalMatch && locationMatch;
    });
};
