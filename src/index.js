// ** React Imports
import { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import ability from './configs/acl/ability'
import { ToastContainer } from 'react-toastify'
import { AbilityContext } from './utility/context/Can'
import { ThemeContext } from './utility/context/ThemeColors'
import './configs/i18n'
import Spinner from './@core/components/spinner/Fallback-spinner'
import './@core/components/ripple-button'
import './@fake-db'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'
import 'react-perfect-scrollbar/dist/css/styles.css'
import '@styles/react/libs/toastify/toastify.scss'
import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/global/global.scss'
import './@core/scss/core.scss'
import './assets/scss/style.scss'
import * as serviceWorker from './serviceWorker'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const LazyApp = lazy(() => import('./App'))

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <DndProvider backend={HTML5Backend}>
        <AbilityContext.Provider value={ability}>
          <ThemeContext>
            <LazyApp />
            <ToastContainer newestOnTop />
          </ThemeContext>
        </AbilityContext.Provider>
      </DndProvider>
    </Suspense>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
