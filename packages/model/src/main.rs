use axum::{routing::get, Router};
use std::net::SocketAddr;
use std::env;
use axum::serve;
use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    let app = Router::new().route("/predict", get(|| async { "ML prediction here" }));

    
    let port = env::var("MODEL_PORT").unwrap_or_else(|_| "8081".into());
    let addr: std::net::SocketAddr = format!("127.0.0.1:{}", port).parse().unwrap();

    
    let listener = TcpListener::bind(addr).await.unwrap();
    
    dotenvy::dotenv().ok();

    println!("Serving on http://{}", addr);

    serve(listener, app).await.unwrap();
}
