// filesupload.js

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://fxttvzupnaarxqpbfdhr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4dHR2enVwbmFhcnhxcGJmZGhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5NDQzMDAsImV4cCI6MjAxNzUyMDMwMH0.uHsh_YhrJ5UzcwTXwipnF-0guZ6k8sKuYFwaMnpW9ls');

// Function to upload image
const upLoadeIMG = async (buffer) => {
    try {
        const { data, error } = await supabase.storage
            .from('your-storage-bucket-name')
            .upload('images/' + Date.now(), buffer, { contentType: 'image/jpeg' });
        
        if (error) {
            throw error;
        }

        return data?.Key || null;
    } catch (error) {
        console.error('Error uploading image:', error.message);
        throw error;
    }
};

// Function to upload video
const upLoadeVideo = async (buffer) => {
    try {
        const { data, error } = await supabase.storage
            .from('your-storage-bucket-name')
            .upload('videos/' + Date.now(), buffer, { contentType: 'video/mp4' });

        if (error) {
            throw error;
        }

        return data?.Key || null;
    } catch (error) {
        console.error('Error uploading video:', error.message);
        throw error;
    }
};

module.exports = { upLoadeIMG, upLoadeVideo };
