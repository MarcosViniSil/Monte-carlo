import random

# ------------------------------
# 1. Distribuições de probabilidade
# ------------------------------

# Frequência relativa das chegadas e dos consertos
chegadas_freq = {0: 5, 1: 7, 2: 18, 3: 12, 4: 5, 5: 3}
consertos_freq = {0: 4, 1: 6, 2: 20, 3: 10, 4: 6, 5: 4}

# Converter frequências absolutas (50 dias) para probabilidades cumulativas
def gerar_faixas(freq_dict):
    total = sum(freq_dict.values())
    acumulado = 0
    faixas = []
    for valor, freq in freq_dict.items():
        prob = freq / total
        faixas.append((valor, acumulado, acumulado + prob))
        acumulado += prob
    return faixas

chegadas_faixas = gerar_faixas(chegadas_freq)
consertos_faixas = gerar_faixas(consertos_freq)

# ------------------------------
# 2. Função para converter número aleatório → quantidade de carros
# ------------------------------

def gerar_valor(faixas, r):
    for valor, inicio, fim in faixas:
        if inicio <= r < fim:
            return valor
    return faixas[-1][0]  # segurança (caso r=1.0)

# ------------------------------
# 3. Simulação de 20 dias
# ------------------------------

dias = 20
restantes = 0
soma_restantes = 0

print("Dia | Aleatório | Chegadas | Consertos | Em serviço | Restantes")
print("-" * 60)

for dia in range(1, dias + 1):
    # mesmo número aleatório para chegadas e consertos
    r = random.random()
    chegadas = gerar_valor(chegadas_faixas, r)
    consertos = gerar_valor(consertos_faixas, r)
    
    total_na_oficina = restantes + chegadas
    restantes = max(0, total_na_oficina - consertos)
    soma_restantes += restantes

    print(f"{dia:3} | {r:.3f}     | {chegadas:^8} | {consertos:^9} | {total_na_oficina:^10} | {restantes:^9}")

media_restantes = soma_restantes / dias

print("\nMédia de carros que permanecem em conserto por mais de um dia:", round(media_restantes, 2))
