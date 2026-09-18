/**
 * O formulário pede só o nome.
 *
 * CPF e telefone saíram na v1.5.0: para chamar um intérprete não é preciso
 * identificar a pessoa, e cada campo a mais é uma barreira a quem só quer ser
 * atendido. Estes testes existem para que eles não voltem sem querer — num
 * merge malfeito, por exemplo — e para garantir que o que vai para a API
 * acompanhe o que a tela pergunta.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const ler = (arquivo) => fs.readFileSync(new URL('../' + arquivo, import.meta.url), 'utf8');

const builds = [
    ['ESM (npm)', 'dist/ilibras-widget.mjs'],
    ['IIFE (<script>)', 'dist/ilibras-widget.js'],
    ['raiz (sites já instalados)', 'ilibras-widget.js'],
];

for (const [nome, arquivo] of builds) {
    test(`${nome}: o formulário tem o campo de nome`, () => {
        assert.ok(ler(arquivo).includes('ilibras-name'), 'o campo de nome sumiu');
    });

    test(`${nome}: não pede CPF`, () => {
        const codigo = ler(arquivo);
        assert.ok(!codigo.includes('ilibras-cpf'), 'o campo de CPF voltou ao formulário');
        assert.ok(!codigo.includes('validateCPF'), 'a validação de CPF voltou');
    });

    test(`${nome}: não pede telefone`, () => {
        const codigo = ler(arquivo);
        assert.ok(!codigo.includes('ilibras-phone'), 'o campo de telefone voltou ao formulário');
        assert.ok(!codigo.includes('O DDD informado'), 'a validação de DDD voltou');
    });

    test(`${nome}: manda ao servidor só o que perguntou`, () => {
        const codigo = ler(arquivo);
        assert.ok(codigo.includes("append(\"nome\""), 'o nome deixou de ser enviado');
        assert.ok(!codigo.includes("append(\"cpf\""), 'ainda envia CPF ao servidor');
        assert.ok(!codigo.includes("append(\"telefone\""), 'ainda envia telefone ao servidor');
    });

    test(`${nome}: o consentimento continua obrigatório`, () => {
        assert.ok(ler(arquivo).includes('ilibras-consent'), 'a caixa de consentimento sumiu');
    });
}

test('o canal alternativo ainda aceita telefone do cliente', () => {
    // `fallback.telefone` é o contato da empresa exibido quando a API cai —
    // nada a ver com o telefone que o formulário deixou de pedir.
    const codigo = ler('dist/ilibras-widget.mjs');
    assert.ok(codigo.includes('fallback'), 'o plano de contingência sumiu');
    assert.ok(codigo.includes('tel:'), 'o link de telefone do fallback sumiu');
});
