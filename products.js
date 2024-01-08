// 產品資料格式
import { createApp, ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  setup(){
    const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
    const apiPath = 'wei-c';
    const products = ref([]);
    const tempProducts = ref({});

    //首先確認是否登入
    const checkAdmin = () => {
      const url = `${apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          getData();
        })
        .catch((err) => {
          // console.log('err',err)
          alert(err.response.data.message);
          window.location = 'login.html';
        });
    };

    const getData = () => {
      const url = `${apiUrl}/api/${apiPath}/admin/products`;
      axios.get(url)
        .then((response) => {
          products.value = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    };
    
    onMounted(() => {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      //取得token
      axios.defaults.headers.common['Authorization'] = token;
      //預設夾帶token至header

      checkAdmin();
    });

    return{
      products,
      tempProducts
    }
  }
}).mount('#app');