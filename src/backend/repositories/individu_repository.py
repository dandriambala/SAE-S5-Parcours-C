from shared.peristence import load_data, save_data

DATA_PATH = './data/individu.json'

def get_all_individus():
    return load_data(DATA_PATH)

def get_individu_by_id(individu_id):
    individus = load_data(DATA_PATH)
    return next((c for c in individus if c['id'] == individu_id), None)

def add_individu(individu_data):
    individus = load_data(DATA_PATH)
    individu_data['id'] = max([c['id'] for c in individus] + [0]) + 1
    individus.append(individu_data)
    save_data(DATA_PATH, individus)
    return individu_data

def update_individu(individu_id, individu_data):
    individus = load_data(DATA_PATH)
    individu = next((c for c in individus if c['id'] == individu_id), None)
    if individu:
        individu.update(individu_data)
        save_data(DATA_PATH, individus)
    return individu