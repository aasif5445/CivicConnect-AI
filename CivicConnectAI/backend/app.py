import os
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(app.config['CHROMA_PERSIST_DIR'], exist_ok=True)
    
    # Register Blueprints
    from routes.auth_routes import auth_bp
    from routes.scheme_routes import scheme_bp
    from routes.chat_routes import chat_bp
    from routes.admin_routes import admin_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api')
    app.register_blueprint(scheme_bp, url_prefix='/api')
    app.register_blueprint(chat_bp, url_prefix='/api')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'online',
            'system': 'CivicConnect AI Backend',
            'version': '1.0.0',
            'database': 'MySQL (civicconnect_db)',
            'vector_store': 'ChromaDB'
        })
        
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
