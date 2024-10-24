const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
          data: null,
          success: false,
          loading: false,
          message: '',
     },
    reducers: {
      login: (state) => {
        // logic set data
        // example
        state.data = {
          username: "Mindx School",
          accessToken: 'abcxyz',
          refreshToken: 'klmnopq',
          email: 'mindx@edu.vn'
        };
        state.success = true;
        state.message = "Đăng nhập thành công!"
      },
      logout: (state) => {
       // logic clear data
        // example
        state.data = null;
        state.success = true;
        state.message = "Đăng xuất thành công!"
      },
    },
  });