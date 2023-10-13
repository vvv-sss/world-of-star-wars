import axios from 'axios';
import Config from 'react-native-config';

const BASE_URL = Config.BASE_URL;

axios.defaults.baseURL = BASE_URL;
