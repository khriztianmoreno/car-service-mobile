import Analytics from 'react-native-firebase-analytics';

const obj = {
  side_menu: {
    CLICK_HAMBURGUER_BUTTON: 'side_menu_click_hamburguer_button',
    CLICK_HOME_SECTION: 'side_menu_click_home_section',
    CLICK_VEHICLES_SECTION: 'side_menu_click_vehicles_section',
    CLICK_EXPENSES_SECTION: 'side_menu_click_expenses_section',
    CLICK_ALERTS_SECTION: 'side_menu_click_alerts_section',
    CLICK_PROMOTIONS_SECTION: 'side_menu_click_promotions_section',
    CLICK_CONFIGURATION_SECTION: 'side_menu_click_configuration_section',
  },
  home: {
    CLICK_BUTTON_FINE: 'home_click_button_fine',
    CLICK_BUTTON_UPDATE: 'home_click_button_update',
    CLICK_NEXT_ALERTS: 'home_click_next_alerts',
  },
  vehicles: {
    ADD_VEHICLE: 'vehicles_add_new',
    ADD_MORE_INFO: 'vehicles_add_more_info',
  },
  expenses: {
    ADD_EXPENSE: 'expenses_add',
    UPDATE_METRICS_DATES: 'expenses_update_metrics_dates',
    CHOOSE_CATEGORY_OTHERS: 'expenses_choose_category_others',
  },
  alerts: {
    CLICK_ON_ALERT: 'alerts_click_on_alert',
  },
  promotions: {
    REQUEST_PROMOTION: 'promotions_click_request',
  },
  notifications: {
    RECEIVED: 'notifications_received',
    OPENED: 'notifications_opened',
  },
};

const sendEvent = (name, params) => Analytics.logEvent(name, params);

/* SIDE MENU EVENTS */
const sideMenuClickHamburguerButton = params => sendEvent(obj.side_menu.CLICK_HAMBURGUER_BUTTON, params);
const sideMenuClickHomeSection = params => sendEvent(obj.side_menu.CLICK_HOME_SECTION, params);
const sideMenuClickVehiclesSection = params => sendEvent(obj.side_menu.CLICK_VEHICLES_SECTION, params);
const sideMenuClickExpensesSection = params => sendEvent(obj.side_menu.CLICK_EXPENSES_SECTION, params);
const sideMenuClickAlertsSection = params => sendEvent(obj.side_menu.CLICK_ALERTS_SECTION, params);
const sideMenuClickPromotionsSection = params => sendEvent(obj.side_menu.CLICK_PROMOTIONS_SECTION, params);
const sideMenuClickConfigurationSection = params => sendEvent(obj.side_menu.CLICK_CONFIGURATION_SECTION, params);

/* HOME EVENTS */
const homeClickFineButton = params => sendEvent(obj.home.CLICK_BUTTON_FINE, params);
const homeClickUpdateButton = params => sendEvent(obj.home.CLICK_BUTTON_UPDATE, params);
const homeClickNextAlerts = params => sendEvent(obj.home.CLICK_NEXT_ALERTS, params);

/* VEHICLES EVENTS */
const vehiclesAddVehicle = params => sendEvent(obj.vehicles.ADD_VEHICLE, params);
const vehiclesAddMoreInfo = params => sendEvent(obj.vehicles.ADD_MORE_INFO, params);

/* EXPENSES EVENTS */
const expensesAddExpense = params => sendEvent(obj.expenses.ADD_EXPENSE, params);
const expensesUpdateMetricsDates = params => sendEvent(obj.expenses.UPDATE_METRICS_DATES, params);
const expensesChooseCategoryOthers = params => sendEvent(obj.expenses.CHOOSE_CATEGORY_OTHERS, params);

/* ALERTS */
const alertsClickOnAlert = params => sendEvent(obj.alerts.CLICK_ON_ALERT, params);

/* PROMOTIONS EVENTS */
const promotionsRequest = params => sendEvent(obj.promotions.REQUEST_PROMOTION, params);

/* NOTIFICATIONS */
const notificationsReceived = params => sendEvent(obj.notifications.RECEIVED, params);
const notificationsOpened = params => sendEvent(obj.notifications.OPENED, params);

export default {
  sideMenuClickHamburguerButton,
  sideMenuClickHomeSection,
  sideMenuClickVehiclesSection,
  sideMenuClickExpensesSection,
  sideMenuClickAlertsSection,
  sideMenuClickPromotionsSection,
  sideMenuClickConfigurationSection,
  homeClickFineButton,
  homeClickUpdateButton,
  homeClickNextAlerts,
  vehiclesAddVehicle,
  vehiclesAddMoreInfo,
  expensesAddExpense,
  expensesUpdateMetricsDates,
  expensesChooseCategoryOthers,
  alertsClickOnAlert,
  promotionsRequest,
  notificationsReceived,
  notificationsOpened,
};
