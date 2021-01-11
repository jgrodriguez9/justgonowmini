import React from 'react';
import { withTranslation } from 'react-i18next';

function GetMealPlan({t, mealPlan}){
    switch(mealPlan){
        case 'nomeal':
            return <span>{t('SinComidaIncluida')}</span>
        case "breakfast":
            return <span>{t('DesayunoIncluido')}</span>
        case "all-inclusive":
            return <span>{t('TodoIncluido')}</span>
        default:
            return mealPlan;
    }
}

export default withTranslation()(GetMealPlan)