// In your main vue file - the one where you create the initial vue instance.
import Vue from 'vue';
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css'; // only if your build system can import css, otherwise import it wherever you would import your css.

Vue.use(VuePlyr);
