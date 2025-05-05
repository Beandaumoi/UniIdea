import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthApi from "../network/AuthApi";

//University
export const fetchUniversities = createAsyncThunk(
  "admin/fetchUniversities",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AuthApi.getUniversities();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addUniversity = createAsyncThunk(
  "admin/addUniversity",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await AuthApi.addUniversity(formData);
      if (!res.data || Object.keys(res.data).length === 0) {
        throw new Error("Dữ liệu trả về từ API không hợp lệ");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateUniversity = createAsyncThunk(
  "admin/updateUniversity",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await AuthApi.updateUniversity(id, formData);
      if (!res.data || Object.keys(res.data).length === 0) {
        throw new Error("Dữ liệu trả về từ API không hợp lệ");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteUniversity = createAsyncThunk(
  "admin/deleteUniversity",
  async (id, { rejectWithValue }) => {
    try {
      await AuthApi.deleteUniversity(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Feedback
export const fetchFeedback = createAsyncThunk(
  "admin/fetchFeedback",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AuthApi.getFeedback();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteFeedback = createAsyncThunk(
  "admin/deleteFeedback",
  async (id, { rejectWithValue }) => {
    try {
      await AuthApi.deleteFeedback(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//User
export const fetchUser = createAsyncThunk(
  "admin/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AuthApi.getUsers();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await AuthApi.deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//Faculty

export const fetchFaculties = createAsyncThunk(
  "admin/fetchFaculties",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AuthApi.getFaculties();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addFaculty = createAsyncThunk(
  "admin/addFaculty",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await AuthApi.addFaculty(formData);
      if (!res.data || Object.keys(res.data).length === 0) {
        throw new Error("Dữ liệu trả về từ API không hợp lệ");
      }
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//Topic
export const fetchTopic = createAsyncThunk(
  "admin/fetchTopic",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AuthApi.getTopics();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchATopic = createAsyncThunk(
  "admin/fetchATopic",
  async (id, { rejectWithValue }) => {
    try {
      const res = await AuthApi.getATopic(id);
      return res.data; // Trả về dữ liệu chi tiết topic
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeTopicStatus = createAsyncThunk(
  "admin/changeTopicStatus",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await AuthApi.changeStatusTopic(id, data);
      return response.data; // Giả sử API trả về { message: "...", data: {...} }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Không thể cập nhật trạng thái" }
      );
    }
  }
);

export const awardTopic = createAsyncThunk(
  "admin/awardTopic",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await AuthApi.topicAward(id, data);
      return res.data; // Giả định API trả về dữ liệu thưởng
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminToken: null,
    admin: null,
    universities: [],
    feedback: [],
    user: [],
    faculty: [],
    topics: [],
    selectedTopic: null,
    loading: false,
    error: null,
  },
  reducers: {
    setAdminToken(state, action) {
      state.adminToken = action.payload.token;
      state.admin = action.payload.admin;
    },
    clearAdminToken(state) {
      state.adminToken = null;
      state.admin = null;
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
    },
  },
  extraReducers: (builder) => {
    builder
      //University
      .addCase(fetchUniversities.fulfilled, (state, action) => {
        state.loading = false;
        state.universities = action.payload;
      })
      .addCase(addUniversity.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          state.universities = [...state.universities, action.payload];
          console.log("Added university:", action.payload);
        } else {
          console.error("Payload không hợp lệ:", action.payload);
        }
      })
      .addCase(updateUniversity.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.universities.findIndex(
          (u) => u.id === action.payload.id
        );
        if (index !== -1) {
          state.universities[index] = action.payload;
          console.log("Updated university:", state.universities[index]);
        }
      })
      .addCase(deleteUniversity.fulfilled, (state, action) => {
        state.loading = false;
        state.universities = state.universities.filter(
          (u) => u.id !== action.payload
        );
      })
      //Feedback
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedback = action.payload;
      })

      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedback = state.feedback.filter(
          (item) => item.id !== action.payload
        );
      })
      //User
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = state.user.filter((item) => item.id !== action.payload);
      })
      //Faculty
      .addCase(fetchFaculties.fulfilled, (state, action) => {
        state.loading = false;
        state.faculty = action.payload;
      })
      .addCase(addFaculty.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          state.faculty = [...state.faculty, action.payload];
          console.log("Added faculty:", action.payload);
        } else {
          console.error("Payload không hợp lệ:", action.payload);
        }
      })
      //Topic
      .addCase(fetchTopic.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })

      .addCase(fetchATopic.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTopic = action.payload; // Lưu chi tiết topic
      })
      .addCase(changeTopicStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTopic = action.payload;
        const index = state.topics.findIndex(
          (topic) => topic.id === updatedTopic.id
        );
        if (index !== -1) {
          state.topics[index] = updatedTopic;
        }
        if (state.selectedTopic?.id === updatedTopic.id) {
          state.selectedTopic = updatedTopic;
        }
      })
      .addCase(awardTopic.fulfilled, (state, action) => {
        state.loading = false;
        const awardedTopic = action.payload;
        const index = state.topics.findIndex(
          (topic) => topic.id === awardedTopic.id
        );
        if (index !== -1) {
          state.topics[index] = awardedTopic;
        }
        if (state.selectedTopic?.id === awardedTopic.id) {
          state.selectedTopic = awardedTopic;
        }
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { setAdminToken, clearAdminToken } = adminSlice.actions;
export default adminSlice.reducer;
