import React from 'react';
import { CareNote, Pagination } from '../types';
import { Box, Button, Typography } from '@mui/material';

interface NotesListProps {
  notes: CareNote[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

export const NotesList: React.FC<NotesListProps> = ({
  notes,
  loading,
  error,
  pagination,
  onPageChange,
}) => {
  if (loading) {
    return (
      <Box className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="text-red-600 p-4">
        {error}
      </Box>
    );
  }

  if (notes.length === 0) {
    return (
      <Box className="text-gray-500 text-center p-4">
        No notes available
      </Box>
    );
  }

  return (
    <Box>
      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <Typography variant="subtitle1" className="font-medium capitalize">
                  {note.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Patient ID: {note.patient_id}
                </Typography>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityClass(note.priority)}`}>
                  Priority {note.priority}
                </span>
              </div>
            </div>
            <Typography variant="body1" className="mb-2">
              {note.note_content}
            </Typography>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Created by: {note.created_by}</span>
              <span>
                {new Date(note.created_at).toLocaleDateString()} {new Date(note.created_at).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Box className="flex justify-center items-center mt-6 space-x-2">
        <Button
          variant="outlined"
          disabled={pagination.currentPage === 1 || loading}
          onClick={() => onPageChange(pagination.currentPage - 1)}
        >
          Previous
        </Button>
        <Typography variant="body2" className="mx-4">
          Page {pagination.currentPage} of {pagination.totalPages}
        </Typography>
        <Button
          variant="outlined"
          disabled={pagination.currentPage === pagination.totalPages || loading}
          onClick={() => onPageChange(pagination.currentPage + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

const getPriorityClass = (priority: number): string => {
  switch (priority) {
    case 1:
      return 'bg-red-100 text-red-800';
    case 2:
      return 'bg-orange-100 text-orange-800';
    case 3:
      return 'bg-yellow-100 text-yellow-800';
    case 4:
      return 'bg-blue-100 text-blue-800';
    case 5:
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};