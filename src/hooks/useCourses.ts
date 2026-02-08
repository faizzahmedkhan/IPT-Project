import { useState, useEffect } from 'react';
import { coursesApi, Course } from '@/lib/api';

// Icon mapping for dynamic rendering
const iconMap: Record<string, string> = {
  Code2: 'Code2',
  Brain: 'Brain',
  Database: 'Database',
  BookOpen: 'BookOpen',
};

interface UseCoursesResult {
  courses: Course[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCourses(): UseCoursesResult {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await coursesApi.getAll();
      setCourses(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return { courses, loading, error, refetch: fetchCourses };
}

export { iconMap };
