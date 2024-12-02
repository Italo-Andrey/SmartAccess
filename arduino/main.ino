/**
 * IMPORTANTE: Rodar esse código na Arduino IDE
 */

#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN); // cria instância MFRC522

void setup()
{
    Serial.begin(9600);
    SPI.begin();
    mfrc522.PCD_Init();
    Serial.println("Aproxime o seu cartao do leitor...");
    Serial.println();
}

void loop()
{
    // procura por um novo cartão
    if (!mfrc522.PICC_IsNewCardPresent())
    {
        return;
    }
    // seleciona um dos cartões
    if (!mfrc522.PICC_ReadCardSerial())
    {
        Serial.println("Nao, aqui entrei");
        return;
    }
    // Mostra UID na serial
    Serial.print("UID da tag: ");
    String conteudo = "";
    byte letra;
    for (byte i = 0; i < mfrc522.uid.size; i++)
    {
        Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
        Serial.print(mfrc522.uid.uidByte[i], HEX);
        conteudo.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
        conteudo.concat(String(mfrc522.uid.uidByte[i], HEX));
    }
    Serial.println();
    Serial.print("Mensagem : ");
    conteudo.toUpperCase();
    if (conteudo.substring(1) == "UUID 1") // UUID 1 - Chaveiro -- substituir pelo UID certo
    {
        Serial.println("Olá Nicolas");
        Serial.println();
        delay(3000);
    }
    if (conteudo.substring(1) == "UUID 2") // UUID 2 - Cartao -- substituir pelo UID certo
    {
        Serial.println("Olá cartão");
        Serial.println();
        delay(3000);
    }
}
