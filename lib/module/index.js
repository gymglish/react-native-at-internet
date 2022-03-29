import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
export let Events;

(function (Events) {
  Events["trackerNeedsFirstLaunchApproval"] = "trackerNeedsFirstLaunchApproval";
  Events["buildDidEnd"] = "buildDidEnd";
  Events["sendDidEnd"] = "sendDidEnd";
  Events["didCallPartner"] = "didCallPartner";
  Events["warningDidOccur"] = "warningDidOccur";
  Events["saveDidEnd"] = "saveDidEnd";
  Events["errorDidOccur"] = "errorDidOccur";
})(Events || (Events = {}));

var ePrivacyVisitorMode;

(function (ePrivacyVisitorMode) {
  ePrivacyVisitorMode["OptOut"] = "OptOut";
  ePrivacyVisitorMode["OptIn"] = "OptIn";
  ePrivacyVisitorMode["Exempt"] = "Exempt";
  ePrivacyVisitorMode["NoConsent"] = "NoConsent";
  ePrivacyVisitorMode["None"] = "None";
})(ePrivacyVisitorMode || (ePrivacyVisitorMode = {}));

var ePrivacyStorageFeature;

(function (ePrivacyStorageFeature) {
  ePrivacyStorageFeature["Campaign"] = "Campaign";
  ePrivacyStorageFeature["UserId"] = "UserId";
  ePrivacyStorageFeature["Privacy"] = "Privacy";
  ePrivacyStorageFeature["IdentifiedVisitor"] = "IdentifiedVisitor";
  ePrivacyStorageFeature["Crash"] = "Crash";
  ePrivacyStorageFeature["Lifecycle"] = "Lifecycle";
})(ePrivacyStorageFeature || (ePrivacyStorageFeature = {}));

const {
  AtInternet
} = NativeModules;

const sanitizeIOSMode = string => {
  if (Platform.OS === 'ios') {
    return "".concat(string.charAt(0).toLowerCase()).concat(string.slice(1));
  } else {
    return string;
  }
};

const Module = AtInternet;
Module.EventEmitter = new NativeEventEmitter(AtInternet);
Module.Events = Events;
Module.SalesInsights = {
  Products: {
    add: AtInternet.salesProductsAdd,
    remove: AtInternet.salesProductsRemove,
    display: (...products) => {
      if (products[0] && Array.isArray(products[0])) {
        return AtInternet.salesProductsDisplay(products[0]);
      } else {
        return AtInternet.salesProductsDisplay(products);
      }
    },
    displayPage: AtInternet.salesProductsDisplayPage
  },
  Cart: {
    display: AtInternet.salesCartDisplay,
    update: AtInternet.salesCartUpdate,
    delivery: AtInternet.salesCartDelivery,
    payment: AtInternet.salesCartPayment,
    awaitingPayments: (cart, shipping, payment, transaction, ...products) => {
      if (products[0] && Array.isArray(products[0])) {
        return AtInternet.salesCartAwaitingPayments(cart, shipping, payment, transaction, products[0]);
      } else {
        return AtInternet.salesCartAwaitingPayments(cart, shipping, payment, transaction, products);
      }
    }
  },
  Transaction: {
    confirmation: (cart, shipping, payment, transaction, ...products) => {
      if (products[0] && Array.isArray(products[0])) {
        return AtInternet.salesTransactionConfirmation(cart, shipping, payment, transaction, products[0]);
      } else {
        return AtInternet.salesTransactionConfirmation(cart, shipping, payment, transaction, products);
      }
    }
  }
};
Module.Privacy = {
  VisitorMode: ePrivacyVisitorMode,
  StorageFeature: ePrivacyStorageFeature,
  setVisitorOptout: async () => {
    const newMode = await AtInternet.setPrivacyVisitorOptout();
    return newMode.charAt(0).toUpperCase() + newMode.slice(1);
  },
  setVisitorOptIn: async () => {
    const newMode = await AtInternet.setPrivacyVisitorOptin();
    return newMode.charAt(0).toUpperCase() + newMode.slice(1);
  },
  extendIncludeBuffer: (mode, ...keys) => AtInternet.extendIncludeBuffer(sanitizeIOSMode(mode), keys.map(sanitizeIOSMode)),
  extendIncludeStorage: (mode, ...features) => AtInternet.extendIncludeStorage(sanitizeIOSMode(mode), features.map(sanitizeIOSMode)),
  getVisitorMode: async () => {
    const mode = await AtInternet.getPrivacyVisitorMode();
    return mode.charAt(0).toUpperCase() + mode.slice(1);
  },
  setVisitorMode: async (mode, parameters = {}) => {
    const newMode = await AtInternet.setPrivacyVisitorMode(sanitizeIOSMode(mode), parameters);
    return newMode.charAt(0).toUpperCase() + newMode.slice(1);
  }
};
export default Module;
//# sourceMappingURL=index.js.map