const convertionsTypeExpense = {
  direct: {
    CARWASH: 'Lavado',
    ASSISTANCE: 'Asistencia',
    MECHANICAL: 'Reparaciones',
    FUEL: 'Combustible',
    TOLL: 'Peaje',
    OTHER: 'Otro',
  },
  inverse: {
    Lavado: 'CARWASH',
    Asistencia: 'ASSISTANCE',
    Reparaciones: 'MECHANICAL',
    Combustible: 'FUEL',
    Peaje: 'TOLL',
    Otro: 'OTHER',
  },
};

const convertionsReasons = {
  direct: {
    WORK: 'Trabajo',
    TRAVEL: 'Viaje',
    OTHER: 'Otro',
    PERSONAL: 'Personal',
  },
  inverse: {
    Trabajo: 'WORK',
    Viaje: 'TRAVEL',
    Personal: 'PERSONAL',
    Otro: 'OTHER',
  },
};

const formatDate = (format, cdate) => {
  const date = new Date(cdate);
  const objDate = {
    year: date.getFullYear(),
    month: date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`,
    day: date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`,
    hours: date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`,
    minutes: date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`,
    seconds: date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`,
  };

  if (format === 'time') {
    return `${objDate.hours}:${objDate.minutes}:${objDate.seconds}`;
  }

  return `${objDate.day}/${objDate.month}/${objDate.year}`;
};

const sortExpenseByDate = (array) => {
  array.sort((a, b) => {
    return new Date(b.upatedAt) - new Date(a.updatedAt);
  });
};

export default {
  convertionsTypeExpense,
  convertionsReasons,
  formatDate,
  sortExpenseByDate,
};
