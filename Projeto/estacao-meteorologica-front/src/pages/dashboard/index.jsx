import Header from '../../components/header'
import "./dashboard.css";

export default function Dashboard(){
    return(
        <>
        <Header/>
        <section className="cards">
            <div className="card">
                <h6>Temperatura</h6>
                <h2>32°C</h2>
            </div>
            <div className="card">
                <h6>Umidade</h6>
                <h2>60%</h2>
            </div>
            <div className="card">
                <h6>Pressão</h6>
                <h2>1013hpa</h2>
            </div>
            <div className="card">
                <h6>Vento</h6>
                <h2>12km/h</h2>
            </div>
        </section>

        <section className="graficos">
            <h6>Gráficos</h6>
            <div>
                {/* colocar graficos */}
            </div>
        </section>

        <section className="tabela">
            <h6>Leituras Recentes</h6>
            <table>
                <thead>
                    <tr>
                        <th>Horário</th>
                        <th>Temp.</th>
                        <th>Umidade</th>
                        <th>Vento</th>
                    </tr>
                </thead>
            </table>
            <tbody>
                <tr>
                    <td>12:00</td>
                    <td>45°C</td>
                    <td>50%</td>
                    <td>13km/h</td>
                </tr>
                <tr>
                    <td>12:00</td>
                    <td>45°C</td>
                    <td>50%</td>
                    <td>13km/h</td>
                </tr>
                <tr>
                    <td>12:00</td>
                    <td>45°C</td>
                    <td>50%</td>
                    <td>13km/h</td>
                </tr>
            </tbody>
        </section>
        </>
        
    )
}