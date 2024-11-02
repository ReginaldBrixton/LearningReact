import { db, checkUserPermissions } from '@/lib/firebase';
import { getDoc, doc } from 'firebase/firestore';

export const ArchivedProject = {
  id: '',
  title: '',
  completionDate: '',
  status: '',
  department: '',
  description: '', 
  supervisor: '',
  score: 0
}

export const fetchArchivedProjects = async () => {
  // This would be replaced with an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', title: 'AI-Powered Smart Home', completionDate: '2023-05-15', status: 'Completed', department: 'Computer Science', description: 'A project focused on developing an AI system for smart home automation.', supervisor: 'Dr. Alan Turing', score: 95 },
        { id: '2', title: 'Sustainable Urban Planning', completionDate: '2023-06-20', status: 'Completed', department: 'Urban Studies', description: 'A comprehensive study on sustainable urban development strategies.', supervisor: 'Prof. Jane Jacobs', score: 88 },
        { id: '3', title: 'Quantum Computing Applications', completionDate: '2023-07-10', status: 'Completed', department: 'Physics', description: 'Exploring practical applications of quantum computing in various fields.', supervisor: 'Dr. Richard Feynman', score: 92 },
        { id: '4', title: 'Renewable Energy Solutions', completionDate: '2023-08-05', status: 'Completed', department: 'Environmental Science', description: 'Developing innovative solutions for renewable energy generation and storage.', supervisor: 'Dr. Wangari Maathai', score: 90 },
        { id: '5', title: 'Blockchain in Healthcare', completionDate: '2023-09-01', status: 'Completed', department: 'Health Informatics', description: 'Implementing blockchain technology to improve healthcare data management and security.', supervisor: 'Dr. Elizabeth Blackwell', score: 87 },
        { id: '6', title: 'Nanotechnology in Medicine', completionDate: '2023-10-12', status: 'Completed', department: 'Biomedical Engineering', description: 'Exploring the use of nanotechnology for targeted drug delivery and disease treatment.', supervisor: 'Dr. Robert Langer', score: 94 },
        { id: '7', title: 'Machine Learning for Climate Prediction', completionDate: '2023-11-25', status: 'Completed', department: 'Earth Sciences', description: 'Utilizing machine learning algorithms to improve long-term climate predictions.', supervisor: 'Dr. Syukuro Manabe', score: 91 },
        { id: '8', title: 'Augmented Reality in Education', completionDate: '2023-12-18', status: 'Completed', department: 'Education Technology', description: 'Developing AR applications to enhance learning experiences in classrooms.', supervisor: 'Dr. Sugata Mitra', score: 89 },
        { id: '9', title: 'Genetic Engineering for Crop Resilience', completionDate: '2024-01-30', status: 'Completed', department: 'Agricultural Science', description: 'Applying genetic engineering techniques to develop crops resistant to climate change effects.', supervisor: 'Dr. Norman Borlaug', score: 93 },
        { id: '10', title: 'Advanced Materials for Space Exploration', completionDate: '2024-02-28', status: 'Completed', department: 'Materials Science', description: 'Developing new materials to withstand extreme conditions in space exploration.', supervisor: 'Dr. Mae Jemison', score: 96 },
        { id: '11', title: 'Cybersecurity in IoT Devices', completionDate: '2024-03-15', status: 'Completed', department: 'Information Security', description: 'Enhancing security measures for Internet of Things (IoT) devices to prevent cyber attacks.', supervisor: 'Dr. Bruce Schneier', score: 88 },
        { id: '12', title: 'Behavioral Economics in Public Policy', completionDate: '2024-04-20', status: 'Completed', department: 'Economics', description: 'Applying behavioral economics principles to improve public policy effectiveness.', supervisor: 'Dr. Daniel Kahneman', score: 91 }
      ])
    }, 1000)
  })
}

export async function fetchUserData(userId) {
  try {
    const hasPermission = await checkUserPermissions(userId);
    if (!hasPermission) {
      throw new Error('User does not have required permissions');
    }

    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    return userDoc.data();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}