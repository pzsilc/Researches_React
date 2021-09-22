import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import { LoggedRoute, GuestRoute, AdminRoute } from './middlewares';
import { Header, Footer, BG } from './components/Layout';
import { LoginContainer, LogoutContainer } from './components/Auth';
import { AccountContainer } from './components/Pages/Account';
import { OwnResearchContainer } from './components/Pages/OwnResearch';
import { EmployeeResearchContainer } from './components/Pages/EmployeeResearch';
import { OutcomeContainer } from './components/Pages/Outcome';
import { AdminHomeContainer } from './components/Pages/Admin/Home';
import { AdminReGenerateContainer } from './components/Pages/Admin/ReGenerate';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';



const App = () => {
    return(
        <BrowserRouter>
            <Header/>
            <NotificationContainer/>
            <BG/>
            <main className="pt-24 shadow-xl rounded-xl">
                <Switch>
                    <LoggedRoute exact path="/research/" component={AccountContainer} />
                    <GuestRoute path="/research/login" component={LoginContainer} />
                    <LoggedRoute path="/research/logout" component={LogoutContainer} />
                    <LoggedRoute path="/research/researches/own/:id/" component={OwnResearchContainer} />
                    <LoggedRoute path="/research/researches/:id/" component={EmployeeResearchContainer} />
                    <LoggedRoute path='/research/outcomes/:id/' component={OutcomeContainer} />
                    <AdminRoute path='/research/admin/generate/' component={AdminReGenerateContainer} />
                    <AdminRoute path='/research/admin/' component={AdminHomeContainer} />
                </Switch>
            </main>
            <Footer/>
        </BrowserRouter>
    )
}

export default App;
