// api/jobs.ts
export const jobAPI = {
  // Fetch all jobs with optional filters
  async fetchJobs(params?: {
    site?: string;
    type?: string;
    department?: string;
    location?: string;
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.site) queryParams.append('site', params.site);
    if (params?.type) queryParams.append('type', params.type);
    if (params?.department) queryParams.append('department', params.department);
    if (params?.location) queryParams.append('location', params.location);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await fetch(`/api/jobs?${queryParams}`);
    return response.json();
  },

  // Fetch single job by ID
  async fetchJobById(id: string) {
    const response = await fetch(`/api/jobs/${id}`);
    return response.json();
  },

  // Apply for a job
  async applyForJob(id: string, applicationData: any) {
    const response = await fetch(`/api/jobs/${id}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });
    return response.json();
  },

  // Get job statistics
  async getJobStats() {
    const response = await fetch('/api/jobs/stats');
    return response.json();
  },
};